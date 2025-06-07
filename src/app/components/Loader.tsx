export default function Loader({ title, active }: { title?: string, active?: boolean }): React.JSX.Element {
  return (
    <div className={`loader-wrap ${active ? 'active' : ''}`}>
        {title && <h3 className="title">{title}</h3>}
        <div className="loader-container">
            <div className="loader-bar"></div>
        </div>
    </div>
  );
}