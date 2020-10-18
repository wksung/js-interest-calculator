var initial_deposit = 0;
var compound_frequency = "";
var compound_frequency_no = 0;
var compound_freq = 0;
var number_of_years = 0;
var interest_rate = 0;
var total_value = 0;
var x_axis_array = [];
var y_axis_array = [];
var initial_array = [];

function getChartData(x, y, z){
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: [
            {
                label: '',
                backgroundColor: 'rgb(181, 55, 55)',
                borderColor: 'rgb(181, 55, 55)',
                data: z
            },
            {
                label: '',
                backgroundColor: 'rgb(152, 179, 59)',
                borderColor: 'rgb(152, 179, 59)',
                data: y
            }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 50,
                        suggestedMax: 100,
                    }
                }]
            }
        }
    });
}
getChartData();

function getMoneyValue(val){
    return "$"+ val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

document.querySelector(".btn-calculate").addEventListener("click", function(e){
    compound_freq = document.querySelector(".your-strategy__compound-frequency");
    initial_deposit = document.querySelector(".your-strategy__initial-deposit").value;
    compound_frequency = compound_freq.options[compound_freq.selectedIndex].text;
    number_of_years = document.querySelector(".your-strategy__no-of-years").value;
    interest_rate = document.querySelector(".your-strategy__interest-rate").value/100;
    x_axis_array = [];
    y_axis_array = [];
    initial_array = [];

    if(initial_deposit == "" || compound_frequency == "" || number_of_years == "" || interest_rate == ""){
        getChartData();
        document.querySelector(".result-container .initial-deposit").innerHTML = ""
        document.querySelector(".result-container .total-interest").innerHTML = ""
        document.querySelector(".result-container .total-savings").innerHTML = ""
        document.querySelector(".result-container .initial-deposit-text").innerHTML = "";
        document.querySelector(".result-container .total-interest-text").innerHTML = "";
        document.querySelector(".result-container .total-savings-text").innerHTML = "";
    }else{
        if(compound_frequency == "Annually"){
            compound_frequency_no = 1;
        }else if(compound_frequency == "Monthly"){
            compound_frequency_no = 12;
        }else if(compound_frequency == "Fortnightly"){
            compound_frequency_no = 26;
        }else if(compound_frequency == "Weekly"){
            compound_frequency_no = 52;
        }else if(compound_frequency == "Daily"){
            compound_frequency_no = 365;
        }

        total_value = (initial_deposit*Math.pow((1 + (interest_rate/compound_frequency_no)), number_of_years*compound_frequency_no)).toFixed(2);
        for(var i = 1; i < parseInt(number_of_years) + 1; i++){
            x_axis_array.push(i);
            initial_array.push(initial_deposit);
            y_axis_array.push((initial_deposit*Math.pow((1 + (interest_rate/compound_frequency_no)), i*compound_frequency_no)).toFixed(2));
        }    

        document.querySelector(".result-container .initial-deposit").innerHTML = getMoneyValue(initial_deposit);
        document.querySelector(".result-container .total-interest").innerHTML = getMoneyValue((total_value - initial_deposit).toFixed(2));
        document.querySelector(".result-container .total-savings").innerHTML = getMoneyValue(total_value);
        document.querySelector(".result-container .initial-deposit-text").innerHTML = "<div class='red-line'></div>Initial Deposit:";
        document.querySelector(".result-container .total-interest-text").innerHTML = "<div class='green-line'></div>Total Interest:";
        document.querySelector(".result-container .total-savings-text").innerHTML = "Total Savings:";

        getChartData(x_axis_array, y_axis_array, initial_array);
    }
});