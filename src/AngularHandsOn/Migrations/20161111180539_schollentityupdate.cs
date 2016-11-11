using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularHandsOn.Migrations
{
    public partial class schollentityupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SchoolId",
                table: "Schools",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClassroomId",
                table: "Classrooms",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ActivityId",
                table: "Activities",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SchoolId",
                table: "Schools");

            migrationBuilder.DropColumn(
                name: "ClassroomId",
                table: "Classrooms");

            migrationBuilder.DropColumn(
                name: "ActivityId",
                table: "Activities");
        }
    }
}
