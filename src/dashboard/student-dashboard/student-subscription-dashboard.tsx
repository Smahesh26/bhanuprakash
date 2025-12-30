"use client";
import { useSession } from "next-auth/react";
import DashboardBannerTwo from "@/dashboard/dashboard-common/DashboardBannerTwo";
import DashboardSidebarTwo from "@/dashboard/dashboard-common/DashboardSidebarTwo";
import Image from "next/image";
import bg_img from "@/assets/img/bg/dashboard_bg.jpg";

const StudentSubscriptionDashboard = () => {
  const { data: session } = useSession();
  const user = session?.user as any;

  return (
    <section className="dashboard__area section-pb-120">
      <div className="dashboard__bg">
        <Image src={bg_img} alt="" />
      </div>
      <div className="container">
        <DashboardBannerTwo />
        <div className="dashboard__inner-wrap">
          <div className="row">
            <DashboardSidebarTwo />
            <div className="col-lg-9">
              <div className="dashboard__content-wrap">
                <div className="dashboard__content-title mb-4">
                  <h4 className="title">Active Subscriptions</h4>
                </div>

                {user?.hasActiveSubscription ? (
                  <div className="card" style={{ borderRadius: 12, border: '2px solid #e3e6ed' }}>
                    <div className="card-body p-4">
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                        <div style={{
                          width: 60,
                          height: 60,
                          borderRadius: 12,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 16
                        }}>
                          <i className="fas fa-crown" style={{ fontSize: 24, color: '#fff' }}></i>
                        </div>
                        <div>
                          <h5 style={{ marginBottom: 4, fontWeight: 700 }}>
                            {user?.subscriptionPlan === 'yearly' ? 'Yearly Plan' : 
                             user?.subscriptionPlan === 'quarterly' ? 'Quarterly Plan' : 'Monthly Plan'}
                          </h5>
                          <p className="text-muted mb-0">
                            Status: <span style={{ color: '#5dba47', fontWeight: 600 }}>Active</span>
                          </p>
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid #e3e6ed', paddingTop: 20 }}>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <p className="text-muted mb-1" style={{ fontSize: 13 }}>Plan Type</p>
                            <p style={{ fontWeight: 600 }}>
                              {user?.subscriptionPlan === 'yearly' ? 'Annual Subscription' : 
                               user?.subscriptionPlan === 'quarterly' ? '3-Month Subscription' : 'Monthly Subscription'}
                            </p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <p className="text-muted mb-1" style={{ fontSize: 13 }}>Renewal Date</p>
                            <p style={{ fontWeight: 600 }}>
                              {user?.subscriptionEnd ? new Date(user.subscriptionEnd).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        </div>

                        <div style={{ 
                          background: '#f7f8fa', 
                          padding: 16, 
                          borderRadius: 8,
                          marginTop: 16
                        }}>
                          <h6 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Your Benefits:</h6>
                          <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
                            <li style={{ marginBottom: 8 }}>✅ Access to all video lectures</li>
                            <li style={{ marginBottom: 8 }}>✅ Download PDF materials</li>
                            <li style={{ marginBottom: 8 }}>✅ MCQ practice with explanations</li>
                            <li style={{ marginBottom: 8 }}>✅ Case study materials</li>
                            <li>✅ Priority support</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: 60,
                    background: '#f7f8fa',
                    borderRadius: 12
                  }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>📋</div>
                    <h5 style={{ marginBottom: 12 }}>No Active Subscription</h5>
                    <p className="text-muted mb-4">Subscribe to access all premium content and materials</p>
                    <a href="/student-dashboard" className="btn" style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      padding: '12px 32px',
                      borderRadius: 8,
                      border: 'none',
                      fontWeight: 600
                    }}>
                      View Plans
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentSubscriptionDashboard;
