import "../../style/component/form.scss";
export default function Model({ children, open }) {
  if (!open) {
    return;
  }
  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">{children}</div>
      </div>
      <div className="model-overlay"></div>
    </div>
  );
}
