const weeklyReport = (() => {
  const divCardFooterWrapper = document.createElement('div');
  divCardFooterWrapper.setAttribute('class', 'card-footer-wrapper');
  const divCardFooter = document.createElement('div');
  divCardFooter.setAttribute('class', 'card-footer');

  const weeklyReport = (day, num) => {
    const divDay = document.createElement('div');
    const dayH3 = document.createElement('h3');
    dayH3.textContent = day;
    const canvas = document.createElement('canvas');
    canvas.id = `icon${num}`;
    canvas.width = '30';
    canvas.height = '30';
    const tempText = document.createElement('h3');
    tempText.innerHTML = '15°<span>C</span>';

    divDay.appendChild(dayH3);
    divDay.appendChild(canvas);
    divDay.appendChild(tempText);

    return divDay;
  };

  const monday = weeklyReport('Mon', '2');
  const tuesday = weeklyReport('Tue', '3');
  const wednesday = weeklyReport('Wed', '4');
  const thursday = weeklyReport('Thu', '5');
  const friday = weeklyReport('Fri', '6');
  const saturday = weeklyReport('Sat', '7');
  const sunday = weeklyReport('Sun', '8');

  divCardFooter.appendChild(monday);
  divCardFooter.appendChild(tuesday);
  divCardFooter.appendChild(wednesday);
  divCardFooter.appendChild(thursday);
  divCardFooter.appendChild(friday);
  divCardFooter.appendChild(saturday);
  divCardFooter.appendChild(sunday);
  divCardFooterWrapper.appendChild(divCardFooter)

  return divCardFooterWrapper;
})();

export default weeklyReport;
