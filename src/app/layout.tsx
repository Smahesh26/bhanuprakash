import "../styles/index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./Providers"; // ✅ Import client-side wrapper
import FooterTwo from "@/layouts/footers/FooterTwo";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&display=swap"
        />
      </head>

      <body>
        <Providers>
          <main className="min-h-[calc(100vh-200px)]">
            {children}
          </main>
          <ToastContainer position="top-right" autoClose={3000} />
          <FooterTwo />
        </Providers>
      </body>
    </html>
  );
}
