"use client"
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import Group from "./components/Group";

import { PriorityLevels, ProgressLevels } from "./constant";

function App() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

const [grouping, setGrouping] = useState(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("grouping") !== null
      ? parseInt(localStorage.getItem("grouping"))
      : 2;
  } else {
    return 2; 
  }
});

const [ordering, setOrdering] = useState(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("ordering") !== null
      ? parseInt(localStorage.getItem("ordering"))
      : 0;
  } else {
    return 0; 
  }
});

  const [byPriority, setByPriority] = useState([]);
  const [byUser, setByUser] = useState([]);
  const [byStatus, setByStatus] = useState([]);

  useEffect(() => {
    axios
      .get("https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers")
      .then((res) => {
        setUsers(res.data.users);
        const p = {};
        PriorityLevels.forEach((level) => {
          p[level] = [];
        });
        res.data.tickets.forEach((ticket) => {
          const priority = PriorityLevels[ticket.priority];
          p[priority].push(ticket);
        });
        setByPriority(p);
        const u = res.data.tickets.reduce((acc, ticket) => {
          const userId =
            res.data.users[parseInt(ticket.userId.split("-")[1]) - 1].name;
          acc[userId] = acc[userId] || [];
          acc[userId].push(ticket);
          return acc;
        }, []);
        setByUser(u);
        const s = {};
        ProgressLevels.forEach((level) => {
          s[level] = [];
        });
        res.data.tickets.forEach((ticket) => {
          const status = ticket.status;
          s[status].push(ticket);
        });
        setByStatus(s);

        setGroups(grouping === 0 ? s : grouping === 1 ? u : p);
      });
  }, [grouping]);

  useEffect(() => {
    if (grouping === 0) {
      setGroups(byStatus);
    } else if (grouping === 1) {
      setGroups(byUser);
    } else if (grouping === 2) {
      setGroups(byPriority);
    }
  }, [grouping, byPriority, byUser, byStatus]);

  return (
    <body>
      <Header
        grouping={grouping}
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
      />
      <main className="main-container"
        style={{
          marginTop: "2rem",
          display: "flex",
          padding: "0.6rem",
          gap: "0.6rem",
          overflow: "auto",
          minHeight: "calc(100vh - 18rem)",
        }}
      >
        {Object.keys(groups).map((group, id) => {
          return (
            <Group
              width={100 / groups.length}
              key={id}
              users={users}
              name={group}
              grouping={grouping}
              ordering={ordering}
              tasks={Object.values(groups)[id]}
            />
          );
        })}
      </main>
    </body>
  );
}

export default App;