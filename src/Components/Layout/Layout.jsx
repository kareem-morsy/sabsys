import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

function Layout() {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "red",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "#d359ff",
                  backgroundColor: active ? "#eecef9" : undefined,
                };
            },
          }}
        >
          <MenuItem routerLink={<Link to="/documentation" />}>
            {" "}
            Documentation
          </MenuItem>
          <MenuItem routerLink={<Link to="/calendar" />}> Calendar</MenuItem>
          <MenuItem routerLink={<Link to="/e-commerce" />}>
            {" "}
            E-commerce
          </MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}>Collapse</button>
      </main>
    </div>
  );
}
