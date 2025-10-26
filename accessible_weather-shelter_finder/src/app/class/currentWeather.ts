export class CurrentWeather {
    humidity?: number | undefined;
    last_updated?: string | undefined;
    temp_c?: number | undefined;
    temp_f?: number | undefined;
    uv?: number | undefined;
    wind_kph?: number | undefined;
    condition?: Condition | undefined;
}
export class Condition {
    text?: string | undefined;
    icon?: string | undefined;
    code?: number | undefined;
}