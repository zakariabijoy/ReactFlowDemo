using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactFlowBE.Migrations
{
    /// <inheritdoc />
    public partial class reactflowtableupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FlowName",
                table: "ReactFlows",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FlowName",
                table: "ReactFlows");
        }
    }
}
