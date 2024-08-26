
# Scrapmancer

**Scrapmancer** is a tool that lets you you effortlessly create and manage web scraping cron jobs. Define your scraping jobs as JSON files and let Scrapmancer handle the rest. Ideal for automating data extraction tasks with minimal effort.

## Features

- **Create Web Scraping Cron Jobs**: Easily schedule and manage your web scraping tasks.
- **JSON Configuration**: Define your jobs using a simple JSON schema.
- **Flexible Scheduling**: Use cron syntax to set up job timings.

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/scrapmancer.git
    cd scrapmancer
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure your jobs in the `jobs` directory. Each job should be a JSON file with the following schema:

    ```json
    {
        "name": "Job Name",
        "triggerTest": "testName",
        "description": "Optional description",
        "cron": "0 0 * * *"
    }
    ```

    - `name`: The name of the job.
    - `triggerTest`: The name of the Playwright test to be executed.
    - `description`: Optional. A brief description of the job.
    - `cron`: The cron tab value specifying the schedule. For more information on cron syntax, check the [Crontab.guru](https://crontab.guru/) website.

### Usage

1. Start the Scrapmancer service:
    ```bash
    npm start
    ```

2. Scrapmancer will read the job files and execute them according to the specified schedule.

## Future Plans

- **Advanced CLI**: An enhanced command-line interface to simplify job and test creation.
- **Webserver Integration**: A web server to send test results as JSON to a specified endpoint.
- **Mobile Application**: Track and manage tasks on-the-go with a mobile app.

## Contributing

We welcome contributions! If you have ideas for improvements or want to help out, please check out the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to reach out to us via [GitHub Issues](https://github.com/yourusername/scrapmancer/issues) or [Email](mailto:your.email@example.com).

---

Feel free to modify the content to better suit your needs or add more details as your project evolves!