'use client';

import axios from "axios";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    (async () => {
      await axios.post("http://localhost:8000/login", {
        email: "atharvparlikar@gmail.com"
      }, {
        withCredentials: true
      });
    })();
  }, []);

  return (
    <div>
    </div>
  );
}
