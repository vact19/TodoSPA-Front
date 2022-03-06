let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:5000";
} else {
    backendHost = "http://Springbootawsrdsvact19-env.eba-uhiu5pp5.us-east-1.elasticbeanstalk.com"
}

export const API_BASE_URL = `${backendHost}`;