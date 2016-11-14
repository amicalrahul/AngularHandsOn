﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using AngularHandsOn.Entities;

namespace AngularHandsOn.Migrations
{
    [DbContext(typeof(AngularDbContext))]
    partial class AngularDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AngularHandsOn.Entities.Activity", b =>
                {
                    b.Property<string>("ActivityId");

                    b.Property<int?>("ClassroomId");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Name");

                    b.Property<string>("Principal");

                    b.Property<int?>("SchoolId");

                    b.HasKey("ActivityId");

                    b.HasIndex("ClassroomId");

                    b.HasIndex("SchoolId");

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
                    b.Property<int>("ClassroomId");

                    b.Property<string>("Name");

                    b.Property<int?>("SchoolId");

                    b.Property<string>("Teacher");

                    b.HasKey("ClassroomId");

                    b.HasIndex("SchoolId");

                    b.ToTable("Classrooms");
                });

            modelBuilder.Entity("AngularHandsOn.Entities.School", b =>
                {
                    b.Property<int>("SchoolId");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Name");

                    b.Property<string>("Principal");

                    b.HasKey("SchoolId");

                    b.ToTable("Schools");
                });

            modelBuilder.Entity("AngularHandsOn.Entities.Activity", b =>
                {
                    b.HasOne("AngularHandsOn.Entities.Classroom", "Classroom")
                        .WithMany("Activity")
                        .HasForeignKey("ClassroomId");

                    b.HasOne("AngularHandsOn.Entities.School", "School")
                        .WithMany("Activity")
                        .HasForeignKey("SchoolId");
                });

            modelBuilder.Entity("AngularHandsOn.Entities.Classroom", b =>
                {
                    b.HasOne("AngularHandsOn.Entities.School", "School")
                        .WithMany("Classroom")
                        .HasForeignKey("SchoolId");
                });
        }
    }
}
