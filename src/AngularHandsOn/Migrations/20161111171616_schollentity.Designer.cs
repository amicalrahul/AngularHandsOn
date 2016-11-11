using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using AngularHandsOn.Entities;

namespace AngularHandsOn.Migrations
{
    [DbContext(typeof(AngularDbContext))]
    [Migration("20161111171616_schollentity")]
    partial class schollentity
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AngularHandsOn.Entities.Activity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClassroomId");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Name");

                    b.Property<string>("Principal");

                    b.Property<string>("SchoolId");

                    b.HasKey("Id");

                    b.ToTable("Activities");
                });

            modelBuilder.Entity("AngularHandsOn.Entities.Books", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Author");

                    b.Property<int>("Bookid");

                    b.Property<string>("Title");

                    b.Property<int>("YearPublished");

                    b.HasKey("Id");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("AngularHandsOn.Entities.Classroom", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("SchoolId");

                    b.Property<string>("Teacher");

                    b.HasKey("Id");

                    b.ToTable("Classrooms");
                });

            modelBuilder.Entity("AngularHandsOn.Entities.School", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<string>("Name");

                    b.Property<string>("Principal");

                    b.HasKey("Id");

                    b.ToTable("Schools");
                });
        }
    }
}
