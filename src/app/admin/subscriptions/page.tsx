// ...pseudo code for admin subscription reporting...
import prisma from "../../../lib/prisma";

export default async function AdminSubscriptionsPage() {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      subscriptionPlan: true,
      subscriptionStatus: true,
      subscriptionEnd: true,
      hasActiveSubscription: true,
    }
  });

  return (
    <div className="container py-5">
      <h2>User Subscriptions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>End Date</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.subscriptionPlan}</td>
              <td>{user.subscriptionStatus}</td>
              <td>{user.subscriptionEnd ? new Date(user.subscriptionEnd).toLocaleDateString() : "-"}</td>
              <td>{user.hasActiveSubscription ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
