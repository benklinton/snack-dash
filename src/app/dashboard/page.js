import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You are not authorized. Please <a href="/login">log in</a>.</p>;
  }

  return <div>Welcome, {session.user.name}!</div>;
}

