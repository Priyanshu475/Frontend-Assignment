import React from "react";
import Tag from "./Tag";
import Avatar from "./Avatar";
import { priorityIcons, progressIcons } from "./Icons";

const Card = ({ data, user, grouping }) => {
  const { title, tag, id } = data;
  const name = user.name;
  const userId = parseInt(user.id.split("-")[1]) - 1;
  const initial = name
    ? name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("")
    : "initial";

  return (
    <div className="Card bg-white p-3.5 rounded-md min-h-30 m-1.5 relative inline-flex flex-col shadow-md transition-all duration-300 ease">
      <header className="Card__header text-lg font-semibold m-0 flex items-center justify-between">
      <span className="text-gray-400" style={{ fontWeight: '500', fontSize: '0.875rem' }}>{id}</span>
        {grouping !== 1 && <Avatar initial={initial} available={user.available} id={userId} />}
      </header>
      <section className="flex-1 flex gap-4 items-center">
        {grouping !== 0 && progressIcons(data.status)}
        <p className="text-gray-800 text-md">{title}</p>
      </section>
      <footer className="flex gap-1 items-center">
        {grouping !== 2 && <span className="border border-solid border-gray-300 p-1">{priorityIcons(data.priority)}</span>}
        {tag.map((tag, id) => (
          <Tag key={id} text={tag} />
        ))}
      </footer>
    </div>
  );
};

export default Card;
