interface TitleProps {
  value: string;
}

const Title = ({ value }: TitleProps) => {
  return <h2 className="text-6xl font-semibold mb-3 ">{value}</h2>;
};

export default Title;
