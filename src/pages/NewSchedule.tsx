import { Confirmation } from "../components/Confirmation";
import { DateTime } from "../components/DateTime";
import { Services } from "../components/Services";

export function NewSchedule() {
  return (
    <div
      style={{
        height: "calc(100vh - 210px)",
        overflowY: "auto",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <Services />
      <DateTime />
      <Confirmation />
    </div>
  );
}
