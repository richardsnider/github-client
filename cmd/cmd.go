package cmd

import (
	"fmt"
	"os"

	"github.com/richardsnider/github-client/pkg/http"
	"github.com/spf13/cobra"
)

var semanticVersionLinkerFlag string
var buildCommitLinkerFlag string
var buildDateVersionLinkerFlag string

var rootCmd = &cobra.Command{
	Use:   "github-client",
	Short: "github-client",
	Long:  "github-client",
	Run: func(cmd *cobra.Command, args []string) {
		printHelp()
	},
}

var subCommands = []*cobra.Command{
	{
		Use:   "version",
		Short: "version",
		Long:  "version",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("semantic version: ", semanticVersionLinkerFlag)
			fmt.Println("build commit: ", buildCommitLinkerFlag)
			fmt.Println("build date version: ", buildDateVersionLinkerFlag)
		},
	},
	{
		Use:   "workflow",
		Short: "workflow",
		Long:  "workflow",
		Run: func(cmd *cobra.Command, args []string) {
			identiyFailedWorkflowRuns(args[0], 12) // TODO: use args[1] as int
		},
	},
}

const githubApiUrl = "https://api.github.com"

func identiyFailedWorkflowRuns(repoName string, relativeHoursPast int) (runIds []string, err error) {
	// https://docs.github.com/en/rest/actions/workflow-runs#list-workflow-runs-for-a-repository
	response, httpGetErr := http.GetURL(githubApiUrl + "/repos/" + repoName + "/actions/runs")
	if httpGetErr != nil {
		return []string{}, httpGetErr
	}

	return []string{
		response,
	}, nil
}

func printHelp() {
	fmt.Println("HELP")
}

func Execute() {
	for _, subcommand := range subCommands {
		rootCmd.AddCommand(subcommand)
	}

	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
