using AppointmentManager.DTOs;
using AppointmentManager.Models;
using AppointmentManager.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace AppointmentManager.Services
{
    public class DentistService: IDentistService
    {
        private readonly DentistRepository _dentistRepository;
        private readonly IS3Service _s3Service;

        public DentistService(DentistRepository dentistRepository, S3Service s3Service)
        {
            _dentistRepository = dentistRepository;
            _s3Service = s3Service;
        }

        public async Task<Dentist> RegisterDentist(int userId, DentistDto dentistDto, Stream fileStream, string fileName, string contentType)
        {
            var fileUrl = await _s3Service.UploadImageAsync(fileStream, fileName, contentType);

            var dentist = new Dentist
            {
                Photo = fileUrl,
                ClinicAddress = dentistDto.ClinicAddress,
                Description = dentistDto.Description,
                UserId = userId,
                IsProfileComplete = true
            };

            return await _dentistRepository.AddDentist(dentist, dentistDto.SpecialtyIds);
        }
        public async Task<bool> IsProfileComplete(int userId)
        {
            var dentist = await _dentistRepository.GetDentistByUserId(userId);
            return dentist != null && dentist.IsProfileComplete;
        }
    }
}