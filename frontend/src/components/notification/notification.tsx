import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AlertStatus } from "../../types/types";

export function Notification({
  message,
  status,
}: {
  message: string;
  status: AlertStatus;
}) {
  console.log({ status });
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert variant="filled" severity={status}>
        {message}
      </Alert>
    </Stack>
  );
}
