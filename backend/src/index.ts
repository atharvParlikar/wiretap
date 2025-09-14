import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import jwt from "jsonwebtoken";
import type { Graph } from "./types";
import { getCookie, setCookie } from "hono/cookie";
import { cors } from "hono/cors";

const app = new Hono();
const prisma = new PrismaClient();

const SECRET = "sup";

declare module 'hono' {
  interface ContextVariableMap {
    jwtPayload: string
  }
}

// CORS MIDDLEWARE
app.use(
  '*',
  cors({
    origin: (origin) => origin, // dynamically echo back the request origin
    credentials: true,          // allow credentials (cookies/headers)
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
)

// JWT MIDDLEWARE
app.use('/api/*', async (c, next) => {
  const token = getCookie(c, 'token');
  if (!token) {
    c.status(401)
    return c.json({ error: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload
    c.set('jwtPayload', decoded.userId)
    await next()
  } catch (e) {
    c.status(401)
    return c.json({ error: 'Invalid token' })
  }
});

app.post('/login', async (c) => {
  const { email }: { email: string } = await c.req.json()

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      c.status(404)
      return c.json({ error: 'User not found' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET);

    setCookie(c, 'token', token, {
      httpOnly: true,
      secure: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    console.log(c.res);

    return c.json({ message: 'Logged in!', user_id: user.id });
  } catch (e) {
    console.log(e)
    c.status(500)
    return c.json({ error: 'Something went wrong' })
  }
})

app.post('/signup', async (c) => {
  const { name, email }: { name: string, email: string } = await c.req.json();
  console.log(name, email);

  try {
    console.log('creating user...');
    const user = await prisma.user.create({
      data: {
        name,
        email,
        credentials: {}
      }
    });

    console.log(user);
    const token = jwt.sign({ userId: user.id }, SECRET);
    return c.json({ user_id: user.id, jwt: token });
  } catch (e) {

    console.log(e);

    //  TODO: send error back to user
    c.status(500);
    return c.json({ error: e });
  }
});

app.get("/api/test", async (c) => {
  console.log(c.get("jwtPayload"));

  return c.json({
    message: "working"
  });
});

app.post("/api/workflow/create/", async (c) => {
  const { name, graph }: { name: string, graph: Graph } = await c.req.json();
  const userId = c.get("jwtPayload");

  console.log(userId);

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        workflows: {
          push: {
            name,
            graph
          }
        }
      }
    });
  } catch (e) {
    c.status(500);
    return c.json({
      error: e
    });
  }
});

app.post("/api/workflow/:name", async (c) => {
  const { name: workflowName } = c.req.param();
  const userId = c.get("jwtPayload");

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  console.log(user);

  if (!user) return;

  if (!workflowName) {
    c.status(400);
    return c.json({
      error: "Invalid workflow name: " + workflowName
    });
  }

  const workflow = user.workflows.find(w => w.name === workflowName);

  if (!workflow) {
    c.status(404);
    return c.json({
      error: "could not find workflow named: " + workflowName
    });
  }

  const workflowGraph = workflow.graph;
  return c.json(user);
});

export default {
  port: 8000,
  fetch: app.fetch
};
