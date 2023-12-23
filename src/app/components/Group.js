import React from "react";
import Card from "./Card";

import { priorityIcons, progressIcons } from "./Icons";
import Avatar from "./Avatar";

const Group = ({ tasks, name, width, users, grouping, ordering }) => {
  const userIds = tasks.map((task) => parseInt(task.userId.split("-")[1] - 1));
  const initial = name
    ? name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("")
    : "I";
  if (ordering === 0) tasks.sort((a, b) => b.priority - a.priority);
  if (ordering === 1) tasks.sort((a, b) => a.title.localeCompare(b.title));

  const user = users.find((user) => user.name === name) || {
    id: "usr-1",
    available: false,
  };
  const userId = parseInt(user.id.split("-")[1]) - 1;

  return (
    <div
      className="flex flex-col Group m-1.4"
      style={{ width: `${width}%`, minWidth: "300px", flexGrow: 1 }}
    >
      <header className="flex gap-4 items-center Group__header mb-3">
        {grouping === 0 && progressIcons(name)}
        {grouping === 1 && (
          <Avatar initial={initial} id={userId} available={user.available} />
        )}
        {grouping === 2 && priorityIcons(name)}
        <span className="text-medium font-semibold" style={{ color: "#373737" }}>
          {name}
        </span>
        <span className="text-gray-600 flex-grow">{tasks.length}</span>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          class="icon"
          height="1em"
          width="1em"
          style={{ color: 'gray' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 16 16"
          class="icon"
          height="1em"
          width="1em"
          style={{ color: 'gray' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
        </svg>
      </header>
      {tasks.map((task, id) => {
        return (
          <Card
            grouping={grouping}
            key={id}
            user={users[userIds[id]]}
            data={task}
          />
        );
      })}
    </div>
  );
};

export default Group;
