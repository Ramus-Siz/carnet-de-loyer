export default function DateAndTime() {
  var currentdate = new Date();

  let datetime = {
    date: currentdate.getDate(),
    month: currentdate.getMonth(),
    year: currentdate.getFullYear(),
    hour: currentdate.getHours(),
    minute: currentdate.getMinutes(),
    seconds: currentdate.getSeconds(),
  };

  return (
    <>
      <div className="text-sm">
        <p className="text-orange-600 text-right">Salutations</p>
        <p>{`${datetime.date}/${datetime.month}/${datetime.year} | ${datetime.hour}h : ${datetime.minute}`}</p>
      </div>
    </>
  );
}
