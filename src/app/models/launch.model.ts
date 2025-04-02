export interface Launch {
    flight_number: number;
    mission_name: string;
    launch_year: string;
    details: string;
    launch_success: boolean;
    rocket: {
      rocket_name: string;
      rocket_type: string;
      first_stage: {
        cores: {
          land_success: boolean | null;
          landing_type: string;
          landing_vehicle: string;
        }[];
      };
    };
    links: {
      mission_patch_small: string;
      article_link: string;
      wikipedia: string;
      video_link: string;
    };
  }
  