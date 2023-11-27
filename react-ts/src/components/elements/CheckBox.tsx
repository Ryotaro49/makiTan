type CheckBoxProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function CheckBox(props: CheckBoxProps) {
  return (
    <label className="flex items-center gap-2">
      <input {...props} type="checkbox" className="rounded border px-2 py-1" />
      {props.label}
    </label>
  );
}
