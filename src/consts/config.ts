export const config = {
  app: {
    backendUrl:
      import.meta.env.MODE === "development"
        ? "https://localhost:3000"
        : "https://kdt-react-2-team01.elicecoding.com",
  },
};
