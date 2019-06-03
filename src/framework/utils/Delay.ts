export class Delay {
    public static delay(time: number) {
        return new Promise((resolve) => {
            Laya.timer.once(time, this, () => {
                resolve(true);
            }, null, false);
        })
    }
}