import React from "react";

import DailyCaloriesForm from "Components/DailyCaloriesForm";


const MainPage = () => {
    return (<div>
        <h1>Main Private Component</h1>
        <DailyCaloriesForm textBtn='Start losing weight' />
    </div>);
};

export default MainPage;