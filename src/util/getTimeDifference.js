export const getTimeDifference = (chatTime) => {
    const chatTimedata = new Date(chatTime);
    const currentTime = new Date();

    const options = { timeZone: "Asia/Seoul" };
    const koreanChatTimeData = new Date(
        chatTimedata.toLocaleString("en-US", options)
    );
    const koreanCurrentTimeData = new Date(
        currentTime.toLocaleString("en-US", options)
    );

    const timeDiffMinutes = Math.floor(
        (koreanCurrentTimeData - koreanChatTimeData) / (1000 * 60)
    );

    if(Number(timeDiffMinutes) > 1,440){
        const month = koreanChatTimeData.toLocaleString('default', { month: 'short' })
        const date = koreanChatTimeData.getDate();
        return `${month} ${date}일`
    } else if(Number(timeDiffMinutes) === 60){
        return "1시간 전"
    } else {
        return `${timeDiffMinutes / 60}시간 ${timeDiffMinutes % 60}분 전`
    }
};


const options = { timeZone: "Asia/Seoul" };
console.log(new Date("2023-05-17T15:41:53.444+00:00")); // 2023-05-17T15:41:53.444Z
console.log(new Date().toLocaleString("en-US", options)); // 5/18/2023, 4:49:25 AM