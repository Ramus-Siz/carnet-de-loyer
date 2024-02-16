export default function CheckBox({ id, name, type, isChecked, handleClick }) {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        checked={isChecked}
        onChange={handleClick}
      />
    </>
  );
}
