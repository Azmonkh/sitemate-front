import AddIssue from "./createIssue";
import DeleteIssue from "./deleteIssue";
import UpdateIssue from "./updateIssue";


export const metadata = {
  title: "Issues List",
};

type Issue = {
  id: string;
  name: string;
  description: string;
};

async function getIssues() {
  const res = await fetch("http://localhost:8000/issues", {
    cache: "no-store",
  });
  console.log(res)
  return res.json();
}

export default async function IssuesList() {
  const issues: Issue[] = await getIssues();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddIssue />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.data.map((issue, index) => (
            <tr key={issue.id}>
              <td>{index + 1}</td>
              <td>{issue.name}</td>
              <td>{issue.description}</td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateIssue {...issue} />
                </div>

                <DeleteIssue {...issue} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}