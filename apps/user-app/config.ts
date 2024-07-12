const getEnvironmentVariable = (environmentVariable: string): string => {
    console.log(process.env)
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
      throw new Error(
        `Couldn't find environment variable: ${environmentVariable}`
      );
    } else {
      return unvalidatedEnvironmentVariable;
    }
  };
  
  export const config = {
    bankWebsocketUrl: getEnvironmentVariable("WEBSOCKET_URL")
  };