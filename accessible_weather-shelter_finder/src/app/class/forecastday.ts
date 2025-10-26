export class Forecastday {
    astro?: {
        sunrise?: string | undefined;
        sunset?: string | undefined;
    };
    date?: string | undefined;
    day?: {
        avghumidity?: number | undefined;
        avgtemp_c?: number | undefined;
        avgtemp_f?: number | undefined;
        condition?: {
            text?: string | undefined;
        };
        daily_chance_of_rain?: number | undefined;
        daily_chance_of_snow?: number | undefined;
        maxtemp_c?: number | undefined;
        maxtemp_f?: number | undefined;
        maxwind_kph?: number | undefined;
        maxwind_mph?: number | undefined;
        mintemp_c?: number | undefined;
        mintemp_f?: number | undefined;

    };

}