const React = require('react');
const Percent = (props) => {
  let total = props.total !== "NaN%" ? props.total : 'loading...'
  return (
    <div><span className="percent">{total}</span></div>
  );
}

module.exports = Percent;
