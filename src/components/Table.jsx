import { format, differenceInDays } from "date-fns";

export default function BasicTable({ data }) {
  console.log(data);

  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full text-left text-sm text-gray-800">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3 text-right">Email</th>
            <th className="px-6 py-3 text-right">City</th>
            <th className="px-6 py-3 text-right">
              DSR (Days Since Registration)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((person) => {
            const newDate = format(new Date(person.registeredAt), "yyyy-MM-dd");

            return (
              <tr
                key={person.userId}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 font-medium">
                  {person.firstName} {person.lastName}
                </td>
                <td className="px-6 py-4 text-right">{person.email}</td>
                <td className="px-6 py-4 text-right">{person.city}</td>
                <td className="px-6 py-4 text-right">
                  {differenceInDays(formattedDate, newDate)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
