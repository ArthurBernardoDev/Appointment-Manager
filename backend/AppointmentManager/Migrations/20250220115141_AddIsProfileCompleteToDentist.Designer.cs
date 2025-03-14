﻿// <auto-generated />
using AppointmentManager.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AppointmentManager.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250220115141_AddIsProfileCompleteToDentist")]
    partial class AddIsProfileCompleteToDentist
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AppointmentManager.Models.Dentist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClinicAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsProfileComplete")
                        .HasColumnType("bit");

                    b.Property<string>("Photo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Dentists");
                });

            modelBuilder.Entity("AppointmentManager.Models.DentistSpecialty", b =>
                {
                    b.Property<int>("DentistId")
                        .HasColumnType("int");

                    b.Property<int>("SpecialtyId")
                        .HasColumnType("int");

                    b.HasKey("DentistId", "SpecialtyId");

                    b.HasIndex("SpecialtyId");

                    b.ToTable("DentistSpecialties");
                });

            modelBuilder.Entity("AppointmentManager.Models.Specialty", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Specialties");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Ortodontia"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Endodontia"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Periodontia"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Implantodontia"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Dentística"
                        });
                });

            modelBuilder.Entity("AppointmentManager.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(512)
                        .HasColumnType("nvarchar(512)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AppointmentManager.Models.Dentist", b =>
                {
                    b.HasOne("AppointmentManager.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AppointmentManager.Models.DentistSpecialty", b =>
                {
                    b.HasOne("AppointmentManager.Models.Dentist", "Dentist")
                        .WithMany("DentistSpecialties")
                        .HasForeignKey("DentistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppointmentManager.Models.Specialty", "Specialty")
                        .WithMany("DentistSpecialties")
                        .HasForeignKey("SpecialtyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dentist");

                    b.Navigation("Specialty");
                });

            modelBuilder.Entity("AppointmentManager.Models.Dentist", b =>
                {
                    b.Navigation("DentistSpecialties");
                });

            modelBuilder.Entity("AppointmentManager.Models.Specialty", b =>
                {
                    b.Navigation("DentistSpecialties");
                });
#pragma warning restore 612, 618
        }
    }
}
