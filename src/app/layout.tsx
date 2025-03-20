"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, Drawer } from "@mui/material";
import NavBar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/index";
import "./globals.css";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { sidebarOpen, closeSidebar } = useSidebar();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* NavBar */}
      <NavBar />

      {/* Main Layout: Sidebar + Content */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar - Desktop */}
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            width: { lg: 440 },
            flexShrink: 0,
            height: "100%",
            bgcolor: "#fff",
            boxShadow: 1,
          }}
        >
          <Sidebar />
        </Box>

        {/* Drawer Sidebar - Mobile */}
        <Drawer
          open={sidebarOpen}
          onClose={closeSidebar}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: "100%",
              maxWidth: "100%",
              height: "100%",
              bgcolor: "#fff",
            },
          }}
        >
          <Sidebar />
        </Drawer>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 2,
            bgcolor: "#f9f9f9",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <DndProvider backend={HTML5Backend}>
          <SidebarProvider>
            <LayoutContent>{children}</LayoutContent>
          </SidebarProvider>
        </DndProvider>
      </body>
    </html>
  );
}
