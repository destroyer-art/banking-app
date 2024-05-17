import { Request, ServerRoute } from "@hapi/hapi";
 
export const welcomeRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/{name?}",
    handler: (req: Request) => {
      return `Hello ${req.params.name}!`;
    },
  },
];
