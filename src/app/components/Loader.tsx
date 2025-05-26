export default function Loader({ title }: { title?: string }): React.JSX.Element {
  return (
    <div className="loader-wrap">
        {title && <h3 className="title">{title}</h3>}
        <div className="loader-container">
            <div className="loader-bar"></div>
        </div>
    </div>
  );
}