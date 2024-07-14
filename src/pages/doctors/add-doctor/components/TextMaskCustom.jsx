import { IMaskInput } from "react-imask";

export const TextMaskCustom = function TextMaskCustom(props, ref) {
  const { onChange, maskProps, ...other } = props;
  const handleChange = (value) => {
    const placeholder = maskProps.placeholderChar || "_";
    const trimmedValue = value.replaceAll(placeholder, "");
    onChange({ target: { name: props.name, value: trimmedValue } });
  };
  return (
    <IMaskInput
      lazy={false}
      {...other}
      {...maskProps}
      onAccept={handleChange}
      overwrite
    />
  );
};
