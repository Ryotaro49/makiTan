interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CheckBox(props: CheckboxProps) {
  return (
    <div>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
      {props.label}
    </div>
  );
}
