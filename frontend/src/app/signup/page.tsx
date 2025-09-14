'use client';

import axios from "axios";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    (async () => {
      await axios.post("http://localhost:8000/signup", {
        name: "Atharv",
        email: "atharvparlikar@gmail.com"
      });
    })();
  });

  return (
    <div>
    </div>
  );
}
