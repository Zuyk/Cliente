const moment = require("moment");
const employees = [
    {
        name: 'Luis',
        money: 1500,
        timezone: "Europe/Madrid",
        date: '10/02/2018 -- 12:30:30',
        updated_at: "",
    },
    {
        name: 'Ana',
        money: 1000,
        timezone: "Europe/Madrid",
        date: '01/02/2018 -- 12:30:30',
        updated_at: "",
    },
    {
        name: 'Juan',
        money: 1200,
        timezone: "Europe/Madrid",
        date: '10/02/2018 -- 12:33:30',
        updated_at: "",
    },
];

const DATE_FORMAT = 'DD/MM/YYYY';
const DATE_FORMAT_COMPLETE = 'DD/MM/YYYY HH:mm:ss';
const unitTime = ['22d', '2w', '1M'];


const diffDates = (date1, date2) => moment(date1, DATE_FORMAT_COMPLETE).isSame(moment(date2, DATE_FORMAT_COMPLETE))

const sumDates = (date, unitTimes) => {
    const clonedate = unitTimes.reduce((accumulator, current) => {
        accumulator.add(current.substr(0, current.length - 1), current.substr(current.length - 1));
        return accumulator;
    }, moment(date, DATE_FORMAT_COMPLETE).clone())
    return clonedate.format(DATE_FORMAT_COMPLETE);
};

const setDateEmployee = name => {
    const employeeFound = employees.find((employee) => employee.name === name);
    if (employeeFound) {
        employeeFound.date = moment(employeeFound.date, DATE_FORMAT_COMPLETE);
        employeeFound.updated_at = moment().format(DATE_FORMAT_COMPLETE);
        return employeeFound;
    }
};

const sumDiffDate = () => {
    const Diff = employees.reduce((accumulator, current, index) => accumulator += secondDiff(current, index), 0);
    const duration = moment.duration(Diff);
    return getStringDiffFormat(duration);
};

const secondDiff = (current, index) => employees.slice(index, employees.length).reduce((Secondaccumulator, Secondcurrent) => {
    Secondaccumulator += Math.abs(moment(current.date, DATE_FORMAT_COMPLETE).diff(moment(Secondcurrent.date, DATE_FORMAT_COMPLETE)));
    return Secondaccumulator;
}, 0);

const getStringDiffFormat = (duration) => {
    let s = Math.floor((duration / 1000) % 60);
    let m = Math.floor((duration / 1000 / 60) % 60);
    let h = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let d = Math.floor(duration / (1000 * 60 * 60 * 24));
    return d + ' days ' + h + ' hours ' + m + ' minutes ' + s + ' seconds.';
}
console.log(diffDates(employees[0].date, employees[1].date));
console.log(sumDates(employees[0].date, unitTime))
console.log(sumDiffDate());
console.log(setDateEmployee('Ana'));