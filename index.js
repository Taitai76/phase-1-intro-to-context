function createEmployeeRecord(info){
    const Employee = {
        firstName: `${info[0]}`,
        familyName: `${info[1]}`,
        title: `${info[2]}`,
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return Employee;
}

function createEmployeeRecords(info){
    let newArray = [];
    for (const a of info){
        newArray.push(createEmployeeRecord(a)) 
    }
    return newArray;
}

function createTimeInEvent(Employee, date){
    const modDate = date.split(" ")
    let hours = parseInt(modDate[1])
    const newObj={
        type: "TimeIn",
        date: modDate[0],
        hour: hours
    };
    Employee.timeInEvents.push(newObj);
    return Employee;
}

function createTimeOutEvent(Employee, date){
    const modDate= date.split(" ")
    let hours = parseInt(modDate[1])
    const newObj={
        type: "TimeOut",
        date: modDate[0],
        hour: hours
    };
    Employee.timeOutEvents.push(newObj);
    return Employee;
}

function hoursWorkedOnDate(Employee, dateS){
    let inTime= 0;
    let outTime= 0;
    for(const A of Employee["timeInEvents"]){
        if (A['date'] === dateS){
            inTime = A['hour'];
        }
    }
    for(const A of Employee["timeOutEvents"]){
        if (A['date'] === dateS){
            outTime = A['hour'];
        }
    }
    return (outTime-inTime)/100;
}

function wagesEarnedOnDate(Employee, date){
    let hours= hoursWorkedOnDate(Employee, date);
    return (hours*Employee.payPerHour)
}

function allWagesFor(Employee){
    let allWages=[];
    let x=0;
    for(const A of Employee["timeInEvents"]){
        x = wagesEarnedOnDate(Employee, A['date']);
        allWages.push(x);
    }
    const total = allWages.reduce((n, c)=>{
        return n + c;
    }, 0);
    return total;
}

function calculatePayroll(Employees){
    let wages = Employees.map(Employee=>{
        let sum = 0
        for(const A of Employee["timeInEvents"]){
            sum+=wagesEarnedOnDate(Employee, A['date']);
        }
        return sum;
    });

    console.log(wages);
    const total = wages.reduce((n, c)=>{
        return n + c;
    }, 0);
    return total;

}