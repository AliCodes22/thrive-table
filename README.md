

# React Dynamic Table

## Overview

Built a dynamic table in React that displays 500 fake users generated using Faker. Each row shows the user’s full name, email, city, and DSR—days since registration. The table supports sorting by clicking on any column header, and columns can be reordered via drag-and-drop using @dnd-kit.

Full Name and DSR are computed dynamically; they aren’t stored in the data model. I didn’t implement virtualization since the table has only 500 rows, but for tens of thousands of rows I would use react-window to improve performance.

Tailwind CSS handles the styling, ensuring a responsive and clean UI. The table is fully functional and meets all the assignment requirements.

## Features

- Displays **500+ fake users** generated with [Faker.js](https://fakerjs.dev/)
- Columns:
  - Full Name (derived from First + Last Name)
  - Email
  - City
  - DSR (Days Since Registration, calculated dynamically)
- **Sortable** columns: click headers to sort ascending/descending
- **Draggable** columns: drag headers to reorder them
- Styled with **Tailwind CSS** for a clean and responsive UI

## Installation

```bash
git clone https://github.com/AliCodes22/thrive-table
cd thrive-table
npm install
npm run dev
