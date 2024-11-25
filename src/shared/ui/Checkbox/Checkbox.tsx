import styles from './Checkbox.module.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) => {
  return (
    <label className={`${styles.checkbox} ${disabled ? styles.disabled : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={styles.input}
      />
      <span className={styles.box}></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
