import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

interface DefaultSelectProps {
  className?: string;
  options: { label: string; value: string; disabled?: boolean }[]; // 옵션은 disabled 속성을 가질 수 있음
  placeholder: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const DefaultSelect = ({
  className,
  options,
  placeholder,
  value,
  onValueChange,
}: DefaultSelectProps) => {
  const handleValueChange = (selectedValue: string) => {
    if (onValueChange) {
      onValueChange(selectedValue);
    }
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DefaultSelect;
