export const ModuleSelect = ({ type, label, name, handleChange, options }) => {
  return (
    <div class="form-group col-sm-12">
      <label>{label}</label>
      <select
        type={type}
        className="form-control"
        name={name}
        onChange={handleChange}
      >
        {options.map(op => <option key={op.id} value={op.value}>{op.name}</option>)}
      </select>
    </div>
  );
};
