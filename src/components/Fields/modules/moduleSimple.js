export const ModuleSimple = ({type, label, name, handleChange}) => {
  return (
    <div class="form-group col-sm-12">
      <label>{label}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};
