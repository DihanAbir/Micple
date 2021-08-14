import React from "react";

import { AuthGuard } from "../../shared";

function Dashboard() {
  document.title = "Dashboard";
  return <div></div>;
}

export default AuthGuard(Dashboard);
