export interface TocItem {
  id: string;
  label: string;
}

interface SidebarTOCProps {
  items: TocItem[];
  title?: string;
}

function SidebarTOC({ items, title = "Content" }: SidebarTOCProps) {
  return (
    <aside className="shrink-0">
      <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-semibold text-lg mb-4 text-slate-900">{title}</h3>
        <ol className="space-y-2 text-sm">
          {items.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  index === 0
                    ? "bg-teal-50 text-teal-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`shrink-0 w-5 text-center ${
                    index === 0 ? "text-teal-600" : "text-slate-400"
                  }`}
                >
                  {index + 1}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

export default SidebarTOC;
